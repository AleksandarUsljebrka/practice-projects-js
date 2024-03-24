using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.DTOs;
using Services.Services.Interfaces;

namespace SocialNetworkAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]

	public class PostController(IPostService _postService) : Controller
	{
		[HttpPost("add-post")]
		[Authorize]
		public IActionResult AddPost(NewPostDto newPostDto)
		{
			string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();

			var result = _postService.AddPost(newPostDto, token);

			if (!result.Successfull) return StatusCode((int)result.ErrorCode, result.ErrorMess);
			return Ok();
		}
	}
}
