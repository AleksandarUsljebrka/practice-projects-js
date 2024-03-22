using Services.DTOs;
using Services.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Services.Services.Interfaces
{
	public interface IUserService
	{
		IResult GetUser(string token);
		Task<IResult> CreateUser(UserDto userDto);
		Task<IResult> LoginUser(LoginDto loginDto);
	}
}
