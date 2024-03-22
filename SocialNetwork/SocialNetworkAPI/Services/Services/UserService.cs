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

namespace Services.Services
{
	public class UserService(ITokenHelper _tokenHelper, IMapper _mapper, UserManager<User> userManager) : IUserService
	{
		public IResult GetUser(string token)
		{
			IResult result;
			var user = _tokenHelper.UserByToken(token);

			if (user is null) return new Result(false, "No users found!");
			
			UserDto userDto = _mapper.Map<UserDto>(user);

			result = new Result(true, userDto);
			return result;

		}
		public async Task<IResult> CreateUser(UserDto userDto)
		{
			if (userDto is null) return new Result(false, "Model is empty!");

			var newUser = new User()
			{
				UserName = userDto.Username,
				Email = userDto.Email,
				PasswordHash = userDto.Password
			};

			var user = await userManager.FindByEmailAsync(newUser.Email);
			if (user is not null) return new Result(false, "User already exists!");

			var createUser = await userManager.CreateAsync(newUser!, userDto.Password);
			if (!createUser.Succeeded) return new Result(false, "Error during creating account!");


			var loginDto = new LoginDto(userDto.Email, userDto.Password);

			var response = await LoginUser(loginDto);
			return response;
		}

		public async Task<IResult> LoginUser(LoginDto loginDto)
		{
			if (loginDto is null) return new Result(false, "Model is empty!");

			var user = await userManager.FindByEmailAsync(loginDto.Email);
			if (user is null) return new Result(false, "User doesn't exists");

			bool checkPassword = await userManager.CheckPasswordAsync(user, loginDto.Password);
			if (!checkPassword) return new Result(false, "Password incorrect!");

			var userSession = new UserSession(user.Id, user.UserName, user.Email);
			string token = _tokenHelper.GenerateToken(userSession);
			return new Result(true, token!);
		}
	}
}
