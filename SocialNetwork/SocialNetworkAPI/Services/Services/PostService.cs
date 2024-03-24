using AutoMapper;
using Data.Models;
using Data.Repositories.Interfaces;
using Services.DTOs;
using Services.Helpers.Interfaces;
using Services.Results;
using Services.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
	public class PostService(IUnitOfWork _unitOfWork, ITokenHelper _tokenHelper, IMapper _mapper) : IPostService
	{
		public IResult AddPost(NewPostDto newPostDto, string token)
		{
			if (newPostDto is null) return new Result(false, ErrorCode.BadRequest, "Model is empty");

			var user = _tokenHelper.UserByToken(token);
			if (user is null) return new Result(false, ErrorCode.NotFound, "No user found");

			var post = _mapper.Map<Post>(newPostDto);
			post.User = user;
			post.Likes = 0;

			_unitOfWork.PostRepository.Add(post);
			_unitOfWork.SaveChanges();

			return new Result(true);
		}
	}
}
