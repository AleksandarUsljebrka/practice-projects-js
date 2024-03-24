
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
		IResult AddPost(NewPostDto newPost, string token);
	}
}
