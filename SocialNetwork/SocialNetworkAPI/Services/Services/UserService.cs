using Data.Models;
using Services.DTOs;
using Services.Helpers.Interfaces;
using Services.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Services.Results;
using AutoMapper;
using Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Services.Services
{
	public class UserService(IUnitOfWork _unitOfWork, IUserHelper _userHelper, ITokenHelper _tokenHelper, IMapper _mapper, UserManager<User> _userManager) : IUserService
	{
		public IResult GetUser(string token)
		{
			IResult result;
			var user = _tokenHelper.UserByToken(token);

			if (user is null) return new Result(false, ErrorCode.NotFound, "No users found!");
			
			UserDto userDto = _mapper.Map<UserDto>(user);

			result = new Result(true, userDto);
			return result;

		}
		public async Task<IResult> CreateUser(RegisterDto userDto)
		{
			if (userDto is null) return new Result(false, ErrorCode.BadRequest,"Model is empty!");

			var newUser = new User()
			{
				UserName = userDto.Username,
				Email = userDto.Email,
				PasswordHash = userDto.Password
			};

			var user = await _userManager.FindByEmailAsync(newUser.Email);
			if (user is not null) return new Result(false, ErrorCode.Conflict, "User already exists!");

			var createUser = await _userManager.CreateAsync(newUser!, userDto.Password);
			if (!createUser.Succeeded) return new Result(false, ErrorCode.InternalServerError, "Error during creating account!");


			var loginDto = new LoginDto(userDto.Email, userDto.Password);

			var response = await LoginUser(loginDto);
			return response;
		}

		public async Task<IResult> LoginUser(LoginDto loginDto)
		{
			if (loginDto is null) return new Result(false, ErrorCode.InternalServerError, "Model is empty!");

			var user = await _userManager.FindByEmailAsync(loginDto.Email);
			if (user is null) return new Result(false, ErrorCode.Conflict, "User doesn't exists");

			bool checkPassword = await _userManager.CheckPasswordAsync(user, loginDto.Password);
			if (!checkPassword) return new Result(false, ErrorCode.BadRequest, "Password incorrect!");

			var userSession = new UserSession(user.Id, user.UserName, user.Email);
			string token = _tokenHelper.GenerateToken(userSession);
			return new Result(true, token!);
		}

		public IResult UpdateUser(string token, UserDto userDto)
		{
			var user = _tokenHelper.UserByToken(token);
			if (user is null) return new Result(false, ErrorCode.NotFound, "No user found");

			if (_userHelper.GetUserByUsername(userDto.Username) is not null &&
				user.UserName != userDto.Username)
				return new Result(false, ErrorCode.Conflict, $"User with \"{userDto.Username}\" username already exists!");

			if (_userHelper.GetUserByEmail(userDto.Email) is not null &&
				user.Email != userDto.Email)
				return new Result(false, ErrorCode.Conflict, $"User with \"{userDto.Email}\" email already exists!");

			var editedUser = _mapper.Map<User>(userDto);
			_unitOfWork.UserRepository.Update(editedUser);

			_unitOfWork.SaveChanges();
			return new Result(true);

			//var result = await _userManager.UpdateAsync(editedUser);

			//if (result.Succeeded)
			//{
			//	return new Result(true, "User successfully updated");
			//}
			//else
			//{
			//	return new Result(false, ErrorCode.InternalServerError, "Failed to update user");
			//}

		}
		
	}
}
