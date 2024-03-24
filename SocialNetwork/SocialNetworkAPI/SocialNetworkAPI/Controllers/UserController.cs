
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.DTOs;
using Services.Services.Interfaces;

namespace SocialNetworkAPI.Controllers
{
	//[Route("api/[controller]")]
	[ApiController]
	[Route("[controller]")]

	public class UserController(IUserService _userService) : Controller
	{
		[HttpGet]
		[Route("user")]
		[Authorize]
		public IActionResult GetUser()
		{
			string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
			var result = _userService.GetUser(token);

			if (!result.Successfull) return StatusCode((int)result.ErrorCode, result.ErrorMess);
			return Ok(result.Dto);
		}

		[HttpPut("user")]
		[Authorize]
		public IActionResult UpdateUser(UserDto newUserDto)
		{

			string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
			var result = _userService.UpdateUser(token, newUserDto);

			if (!result.Successfull)
				return StatusCode((int)result.ErrorCode, result.ErrorMess);
			return Ok();
		}

		[HttpPost]
		[Route("register")]
		public async Task<IActionResult> Register(RegisterDto userDto)
		{
			var response = await _userService.CreateUser(userDto);

			if (!response.Successfull) return StatusCode((int)response.ErrorCode, response.ErrorMess);

			return Ok(response);
			//return $"OKKKK";
		}
		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginDto loginDTO)
		{
			var response = await _userService.LoginUser(loginDTO);
			if (!response.Successfull) return StatusCode((int)response.ErrorCode, response.ErrorMess);

			return Ok(response);
		}
	}
}
