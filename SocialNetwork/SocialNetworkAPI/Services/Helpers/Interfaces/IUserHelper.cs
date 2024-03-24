using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Helpers.Interfaces
{
	public interface IUserHelper
	{
		User GetUserByUsername(string username);
		User GetUserByEmail(string email);
	}
}
