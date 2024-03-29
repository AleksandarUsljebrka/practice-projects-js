using Data.Models;
using Services.DTOs.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
	public class NewPostDto:IDTO
	{
		public string? Content { get; set; }
		public string? UserId { get; set; }
	}
}
