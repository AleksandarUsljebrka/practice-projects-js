
using Services.DTOs;
using Services.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services.Interfaces
{
	public interface IPostService
	{
		Task<IResult> AddPost(NewPostDto newPost, string token);
		Task<IResult> DeletePost(int postId);
		IResult GetAll();
		Task<IResult> AddComment(NewCommentDto newCommentDto);

		IResult GetComments(int postId);
	}
}
