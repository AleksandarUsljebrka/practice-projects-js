using AutoMapper;
using Data.Models;
using Data.Repositories.Interfaces;
using Microsoft.Identity.Client;
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
		public async Task<IResult> AddPost(NewPostDto newPostDto, string token)
		{
			if (newPostDto is null) return new Result(false, ErrorCode.BadRequest, "Model is empty");

			var user = _tokenHelper.UserByToken(token);
			if (user is null) return new Result(false, ErrorCode.NotFound, "No user found");

			var post = _mapper.Map<Post>(newPostDto);
			post.User = user;
			post.Likes = 0;

			var postId = await _unitOfWork.PostRepository.AddPost(post);
			

			return new Result(true, postId);
		}

		public IResult GetAll()
		{
			var posts = _unitOfWork.PostRepository.GetAllIncludeUsersAndComments();
			if (posts is null) return new Result(false, "There is no posts.");
			//var commentsOfPost = _unitOfWork.CommentRepository.GetAllCommentsOfPost()
			PostListDto postsDto = new PostListDto() { PostList = _mapper.Map<List<PostDto>>(posts)};
			
				return new Result(true, postsDto);
		}

		public IResult AddComment(NewCommentDto newCommentDto)
		{
			if (newCommentDto is null) return new Result(false, ErrorCode.BadRequest, "No content added");

			var post = _unitOfWork.PostRepository.Get(p => p.Id == newCommentDto.PostId);
			if(post is null) return new Result(false, ErrorCode.NotFound, "Post doesn't exists");

			var comment = _mapper.Map<Comment>(newCommentDto);
			comment.PostKey = post.Id;
			comment.Post = post;
			_unitOfWork.CommentRepository.Add(comment);
			_unitOfWork.SaveChanges();

			return new Result(true);
		}

		public IResult GetComments(int postId)
		{
			var post = _unitOfWork.PostRepository.Get(p => p.Id == postId);
			if (post is null) return new Result(false, ErrorCode.NotFound, "Post not found");

			var comments = _unitOfWork.CommentRepository.GetAllCommentsOfPost(c => c.PostKey == postId);
			if (comments is null) return new Result(false, ErrorCode.NotFound, "No comments found");

			var commentsDto = new CommentListDto() { CommentsList = _mapper.Map<List<CommentDto>>(comments)};
			
			return new Result(true, commentsDto);
		}
	}
}
