using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AVSProject.EFModel
{
    public partial class db_AVSContext : DbContext
    {
        public db_AVSContext()
        {
        }

        public db_AVSContext(DbContextOptions<db_AVSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<SBranchs> SBranchs { get; set; }
        public virtual DbSet<SClass> SClasses { get; set; }
        public virtual DbSet<SSchedule> SSchedules { get; set; }
        public virtual DbSet<SStaff> SStaff { get; set; }
        public virtual DbSet<SStaffImages> SStaffImages { get; set; }
        public virtual DbSet<SStaffOfClass> SStaffOfClasses { get; set; }
        public virtual DbSet<SStudents> SStudents { get; set; }
        public virtual DbSet<SUser> SUser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DUCNHAN\\MSSQLSERVER01;Database=db_AVS;User ID=sa;Password=Ducnhan25");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SBranchs>(entity =>
            {
                entity.HasKey(e => e.BranchId);

                entity.ToTable("sBranchs");

                entity.Property(e => e.BranchId).HasColumnName("branchId");

                entity.Property(e => e.ActiveDate)
                    .HasColumnType("datetime")
                    .HasColumnName("activeDate");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("address");

                entity.Property(e => e.BranchCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("branchCode");

                entity.Property(e => e.BranchName)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false)
                    .HasColumnName("branchName");

                entity.Property(e => e.CountMember).HasColumnName("countMember");

                entity.Property(e => e.CountStudent).HasColumnName("countStudent");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("created_by")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Decriptions)
                    .HasMaxLength(2000)
                    .IsUnicode(false)
                    .HasColumnName("decriptions")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.InActiveDate)
                    .HasColumnType("datetime")
                    .HasColumnName("inActiveDate");

                entity.Property(e => e.IsHead).HasColumnName("is_Head");

                entity.Property(e => e.IsInactive).HasColumnName("is_inactive");

                entity.Property(e => e.Manager)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("manager");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("modified_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedBy)
                    .HasColumnName("modified_by")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<SClass>(entity =>
            {
                entity.HasKey(e => new { e.ClassId, e.BranchId });

                entity.ToTable("sClass");

                entity.Property(e => e.ClassId).ValueGeneratedOnAdd();

                entity.Property(e => e.BranchId).HasColumnName("branchId");

                entity.Property(e => e.ClassCode)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ClassName)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.Decriptions)
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.EndDate).HasColumnType("datetime");

                entity.Property(e => e.IsInactive).HasColumnName("is_inactive");

                entity.Property(e => e.Level)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("modified_at");

                entity.Property(e => e.ModifiedBy).HasColumnName("modified_by");

                entity.Property(e => e.StartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<SSchedule>(entity =>
            {
                entity.HasKey(e => new { e.ScheduleId, e.BranchId });

                entity.ToTable("sSchedule");

                entity.Property(e => e.ScheduleId).ValueGeneratedOnAdd();

                entity.Property(e => e.BranchId).HasColumnName("branchId");

                entity.Property(e => e.ClassId).HasColumnName("ClassID");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.Decriptions)
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.IsInactive).HasColumnName("is_inactive");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("modified_at");

                entity.Property(e => e.ModifiedBy).HasColumnName("modified_by");

                entity.Property(e => e.ScheduleName)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.StaffId).HasColumnName("StaffID");
            });

            modelBuilder.Entity<SStaff>(entity =>
            {
                entity.HasKey(e => new { e.StaffId, e.BranchId });

                entity.ToTable("sStaff");

                entity.Property(e => e.StaffId).ValueGeneratedOnAdd();

                entity.Property(e => e.BranchId).HasColumnName("branchId");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("created_by")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.DateOfBirth)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Decriptions)
                    .HasMaxLength(2000)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Idcard)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("IDCard")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IsInactive)
                    .HasColumnName("is_inactive")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.IsVn)
                    .HasColumnName("isVN")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("modified_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedBy)
                    .HasColumnName("modified_by")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.PhoneNumber1)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.PhoneNumber2)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.StaffCode)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.StaffName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SStaffImages>(entity =>
            {
                entity.HasKey(e => e.StaffId);

                entity.ToTable("sStaffImages");

                entity.Property(e => e.StaffId).ValueGeneratedNever();

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("created_by")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.ImageSmall).HasColumnName("Image_small");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("modified_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedBy)
                    .HasColumnName("modified_by")
                    .HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<SStaffOfClass>(entity =>
            {
                entity.HasKey(e => new { e.StaffOfClassId, e.BranchId });

                entity.ToTable("sStaffOfClass");

                entity.Property(e => e.StaffOfClassId).ValueGeneratedOnAdd();

                entity.Property(e => e.BranchId).HasColumnName("branchId");

                entity.Property(e => e.ClassId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.IsInactive).HasColumnName("is_inactive");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("modified_at");

                entity.Property(e => e.ModifiedBy).HasColumnName("modified_by");

                entity.Property(e => e.StaffId)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SStudents>(entity =>
            {
                entity.HasKey(e => new { e.StudentId, e.BranchId });

                entity.ToTable("sStudents");

                entity.Property(e => e.StudentId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("studentId");

                entity.Property(e => e.BranchId).HasColumnName("branchId");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");

                entity.Property(e => e.CreatedBy).HasColumnName("created_by");

                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");

                entity.Property(e => e.Decriptions)
                    .HasMaxLength(2000)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.IsInactive).HasColumnName("is_inactive");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("modified_at");

                entity.Property(e => e.ModifiedBy).HasColumnName("modified_by");

                entity.Property(e => e.PhoneNumber1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.StudentCode)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("studentCode");

                entity.Property(e => e.StudentName)
                    .HasMaxLength(250)
                    .HasColumnName("studentName");
            });

            modelBuilder.Entity<SUser>(entity =>
            {
                entity.HasKey(e => e.Userid);

                entity.ToTable("sUser");

                entity.HasIndex(e => e.Userid, "IX_sUser_user_name")
                    .IsUnique();

                entity.Property(e => e.BranchId).HasColumnName("branchId");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("created_by")
                    .HasDefaultValueSql("((-1))");

                entity.Property(e => e.Decriptions)
                    .IsRequired()
                    .HasMaxLength(2000)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Email)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("full_name")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IsAdmin).HasColumnName("is_admin");

                entity.Property(e => e.IsInactive).HasColumnName("is_inactive");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("modified_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedBy)
                    .HasColumnName("modified_by")
                    .HasDefaultValueSql("((-1))");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(256)
                    .HasColumnName("password")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Permission)
                    .IsRequired()
                    .HasColumnName("permission")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("user_name")
                    .HasDefaultValueSql("('')");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
