
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
		public IActionResult Index()
		{
			string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();
			var result = _userService.GetUser(token);
			return Ok(result.Dto);
		}
		[HttpPost]
		[Route("register")]
		public async Task<IActionResult> Register(UserDto userDto)
		{
			var response = await _userService.CreateUser(userDto);
			return Ok(response);
			//return $"OKKKK";
		}
		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginDto loginDTO)
		{
			var response = await _userService.LoginUser(loginDTO);
			return Ok(response);
		}
	}
}
