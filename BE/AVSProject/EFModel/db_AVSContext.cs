using Microsoft.EntityFrameworkCore;

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
        public virtual DbSet<SStaff> SStaff { get; set; }
        public virtual DbSet<SStaffImages> SStaffImages { get; set; }
        public virtual DbSet<SStudents> SStudents { get; set; }
        public virtual DbSet<SUser> SUser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.\\MSSQLSERVER01;Database=db_AVS;Trusted_Connection=True;MultipleActiveResultSets=true;");
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
                    .HasColumnName("activeDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.BranchCode)
                    .IsRequired()
                    .HasColumnName("branchCode")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.BranchName)
                    .IsRequired()
                    .HasColumnName("branchName")
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.CountMember).HasColumnName("countMember");

                entity.Property(e => e.CountStudent).HasColumnName("countStudent");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("created_by")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Decriptions)
                    .HasColumnName("decriptions")
                    .HasMaxLength(2000)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.InActiveDate)
                    .HasColumnName("inActiveDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsHead).HasColumnName("is_Head");

                entity.Property(e => e.IsInactive).HasColumnName("is_inactive");

                entity.Property(e => e.Manager)
                    .HasColumnName("manager")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ModifiedAt)
                    .HasColumnName("modified_at")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedBy)
                    .HasColumnName("modified_by")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");
            });

            modelBuilder.Entity<SStaff>(entity =>
            {
                entity.HasKey(e => new { e.StaffId, e.BranchId });

                entity.ToTable("sStaff");

                entity.Property(e => e.StaffId).ValueGeneratedOnAdd();

                entity.Property(e => e.BranchId).HasColumnName("branchId");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime")
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
                    .HasColumnName("IDCard")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IsInactive)
                    .HasColumnName("is_inactive")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.IsVn)
                    .HasColumnName("isVN")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnName("modified_at")
                    .HasColumnType("datetime")
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
                    .HasColumnName("created_at")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("created_by")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.ImageSmall).HasColumnName("Image_small");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnName("modified_at")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedBy)
                    .HasColumnName("modified_by")
                    .HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<SStudents>(entity =>
            {
                entity.HasKey(e => new { e.StudentId, e.BranchId });

                entity.ToTable("sStudents");

                entity.Property(e => e.StudentId)
                    .HasColumnName("studentId")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.BranchId).HasColumnName("branchId");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CreatedBy)
                    .HasColumnName("created_by")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.DateOfBirth)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Decriptions)
                    .HasMaxLength(2000)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IsInactive)
                    .HasColumnName("is_inactive")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnName("modified_at")
                    .HasColumnType("datetime")
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

                entity.Property(e => e.StudentCode)
                    .IsRequired()
                    .HasColumnName("studentCode")
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.StudentName)
                    .HasColumnName("studentName")
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<SUser>(entity =>
            {
                entity.HasKey(e => e.Userid);

                entity.ToTable("sUser");

                entity.HasIndex(e => e.Userid)
                    .HasName("IX_sUser_user_name")
                    .IsUnique();

                entity.Property(e => e.BranchId).HasColumnName("branchId");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasColumnType("datetime")
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
                    .HasColumnName("email")
                    .HasMaxLength(150)
                    .IsUnicode(false);

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasColumnName("full_name")
                    .HasMaxLength(50)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.IsAdmin).HasColumnName("is_admin");

                entity.Property(e => e.IsInactive).HasColumnName("is_inactive");

                entity.Property(e => e.ModifiedAt)
                    .HasColumnName("modified_at")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedBy)
                    .HasColumnName("modified_by")
                    .HasDefaultValueSql("((-1))");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(256)
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.Permission)
                    .IsRequired()
                    .HasColumnName("permission")
                    .HasDefaultValueSql("('')");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasColumnName("user_name")
                    .HasMaxLength(100)
                    .HasDefaultValueSql("('')");
            });
        }
    }
}
