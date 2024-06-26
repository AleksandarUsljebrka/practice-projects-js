﻿using AutoMapper;
using Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Models;
namespace Services.Mapping
{
	public class MappingProfile:Profile
	{
		public MappingProfile() 
		{
			
			CreateMap<User, UserDto>().ReverseMap();
			CreateMap<Post, NewPostDto>().ReverseMap();
			CreateMap<Post, PostDto>()
			.ForMember(dest => dest.Username, opt => opt.MapFrom(src => src.User.UserName));
			//.ForMember(dest => dest.Comments, opt => opt.MapFrom(src => src.Comments));
		
			CreateMap<Comment, NewCommentDto>().ReverseMap();
			CreateMap<Comment, CommentDto>().ReverseMap();
		}

	}
}
