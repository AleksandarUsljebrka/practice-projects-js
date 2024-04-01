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
		public async Task<IActionResult> AddPost(NewPostDto newPostDto)
		{
			string token = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").LastOrDefault();

			var result = await _postService.AddPost(newPostDto, token);

			if (!result.Successfull) return StatusCode((int)result.ErrorCode, result.ErrorMess);
			return Ok(result);
		}

		[HttpGet("get-all")]
		[Authorize]
		public IActionResult GetAllPosts()
		{
			var result = _postService.GetAll();
			if (!result.Successfull) return StatusCode((int)result.ErrorCode, result.ErrorMess);

			return Ok(result.Dto);
		}

		[HttpPost("add-comment")]
		[Authorize]
		public async Task<IActionResult> AddComment(NewCommentDto commentDto)
		{
			var result = await _postService.AddComment(commentDto);
			if (!result.Successfull) return StatusCode((int)result.ErrorCode, result.ErrorMess);

			return Ok(result.Dto);
		}

		[HttpGet("get-comments")]
		[Authorize]
		public IActionResult GetComments([FromQuery]int postId)
		{
			var result = _postService.GetComments(postId);
			if (!result.Successfull) return StatusCode((int)result.ErrorCode, result.ErrorMess);

			return Ok(result.Dto);
		}

		[HttpDelete("delete-post")]
		[Authorize]
		public async Task<IActionResult> DeletePost([FromQuery]int postId)
		{
			var result = await _postService.DeletePost(postId);
			if (!result.Successfull) return StatusCode((int)result.ErrorCode, result.ErrorMess);

			return Ok(result);
		}
	}
}
