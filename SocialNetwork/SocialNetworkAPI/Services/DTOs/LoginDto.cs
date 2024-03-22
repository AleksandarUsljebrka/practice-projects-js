﻿using Services.DTOs.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
	public class LoginDto(string email, string password):IDTO
	{
		[Required]
		[EmailAddress]
		public string Email { get; set; } = email;

		[Required]
		[DataType(DataType.Password)]
		public string Password { get; set; } = password;
	}
}
