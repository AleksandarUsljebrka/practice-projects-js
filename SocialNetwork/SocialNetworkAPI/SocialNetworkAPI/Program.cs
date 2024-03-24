using AutoMapper;
using Data.Context;
using Data.Models;
using Data.Repositories;
using Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Services.Helpers;
using Services.Helpers.Interfaces;
using Services.Mapping;
using Services.Services;
using Services.Services.Interfaces;
using Swashbuckle.AspNetCore.Filters;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var mapperConfig = new MapperConfiguration(mc =>
{
	mc.AddProfile(new MappingProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPostService, PostService>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ITokenHelper, TokenHelper>();
builder.Services.AddScoped<IUserHelper, UserHelper>();


builder.Services.AddDbContext<AppDbContext>(options =>
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentity<User, IdentityRole>(
			options =>
			{
				options.Password.RequiredUniqueChars = 0;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequiredLength = 6;
				options.Password.RequireUppercase = false;
				options.Password.RequireLowercase = false;
			}
			)
	.AddEntityFrameworkStores<AppDbContext>()
	.AddSignInManager();



builder.Services.AddAuthentication(opt =>
{
	opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
		 .AddJwtBearer(options =>
		 {
			 options.TokenValidationParameters = new TokenValidationParameters
			 {
				 ValidateIssuer = true,
				 ValidateAudience = false,
				 ValidateLifetime = true,
				 ValidateIssuerSigningKey = true,
				 ValidIssuer = builder.Configuration["Jwt:Issuer"],
				 //ValidAudience = builder.Configuration["Jwt: Audience"],
				 IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
				 //ValidateIssuer = true,
				 //ValidateAudience = false,
				 //ValidateLifetime = true,
				 //ValidateIssuerSigningKey = true,
				 //ValidIssuer = $"http://localhost:{44365}",
				 //IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),

			 };
		 });

builder.Services.AddSwaggerGen(options =>
{

	options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		In = ParameterLocation.Header,
		Description = "Please enter token",
		Name = "Authorization",
		Type = SecuritySchemeType.Http,
		BearerFormat = "JWT",
		Scheme = "bearer"

	});
	options.AddSecurityRequirement(new OpenApiSecurityRequirement
				{
					{
						new OpenApiSecurityScheme
						{
							Reference = new OpenApiReference
							{
								Type=ReferenceType.SecurityScheme,
								Id="Bearer"
							}
						},
						new string[]{}
					}
				});
});
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();


app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
