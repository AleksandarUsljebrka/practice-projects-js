﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
	public record UserSession(string? Id, string Username, string? Email);
	
}
