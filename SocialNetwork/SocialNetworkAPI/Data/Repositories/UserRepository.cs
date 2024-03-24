﻿using Data.Context;
using Data.Models;
using Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Data.Repositories
{
	public class UserRepository(AppDbContext _context) : Repository<User>(_context), IUserRepository
	{

		
	}
}
