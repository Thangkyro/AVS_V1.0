using AVSProject.DataService;
using AVSProject.EFModel;
using AVSProject.Interface;
using AVSProject.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Configuration;
using System.IO;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace AVSProject
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSignalR();

            var configBuilder = new ConfigurationBuilder()
                 .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            var configurationroot = configBuilder.Build();

            services.AddDbContext<db_AVSContext>(options => options.UseSqlServer(configurationroot.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly(typeof(db_AVSContext).Assembly.FullName)));
            services.AddOptions();
            services.AddSwaggerGen();
            services.Configure<EmailSetting>(Configuration.GetSection("MailSettings"));
            services.AddCors(policyBuilder =>
                            policyBuilder.AddDefaultPolicy(policy =>
                            policy.SetIsOriginAllowed(origin => true).AllowAnyHeader().AllowAnyHeader().AllowCredentials())
);          services.AddScoped<IEMailService, MailService>();
            services.Configure<Config>(Configuration.GetSection("Config"));
            services.AddTransient<MailService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        [System.Obsolete]
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("../swagger/v1/swagger.json", "AVS Version 1");
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseRouting();
            app.UseCors();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action}/{id?}");
            });

        }
    }
}
