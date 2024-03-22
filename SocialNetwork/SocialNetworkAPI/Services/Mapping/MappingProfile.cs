using AutoMapper;
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
		}
		
	}
}
