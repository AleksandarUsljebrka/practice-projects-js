﻿using DataAnnotationsExtensions;
using Services.DTOs.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
	public class UserDto:IDTO
	{
		//public string Id {  get; set; }

		[EmailAddress]
		[Required]
		public string Email { get; set; }

		[Required]
		public string Username { get; set; }

		
	}
}
