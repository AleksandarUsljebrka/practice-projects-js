using Services.DTOs.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
	public class PostListDto:IDTO
	{
		public List<PostDto> PostList { get; set; }
	}
}
