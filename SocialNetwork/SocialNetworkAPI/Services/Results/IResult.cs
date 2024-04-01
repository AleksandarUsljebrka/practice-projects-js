
using Services.DTOs.Interfaces;

namespace Services.Results
{
    public interface IResult
    {
        bool Successfull { get; set; }
        string ErrorMess { get; set; }
        IDTO Dto { get; set; }
        ErrorCode ErrorCode { get; set; }
        string Token { get; set; }
		int PostId { get; set; }

	}
}
