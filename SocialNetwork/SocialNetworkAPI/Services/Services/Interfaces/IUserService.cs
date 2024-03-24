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
		Task<IResult> CreateUser(RegisterDto userDto);
		Task<IResult> LoginUser(LoginDto loginDto);
		IResult UpdateUser(string token, UserDto userDto);
	}
}
