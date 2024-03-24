using Data.Models;
using Data.Repositories.Interfaces;
using Services.Helpers.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Helpers
{
	public class UserHelper(IUnitOfWork _unitOfWork):IUserHelper
	{
		public User GetUserByEmail(string email)
		{
			return _unitOfWork.UserRepository.Get(u => u.Email == email);
		}

		public User GetUserByUsername(string username)
		{
			var user = _unitOfWork.UserRepository.Get(u => u.UserName == username);
			return user;
		}
	}
}
