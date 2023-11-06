using System;

namespace AVSProject.Models
{
    public class StudentModel
    {
        public int StudentID { get; set; }
        public string Descriptions { get; set; }
        public int BranchId { get; set; }
        public string StudentCode { get; set; }
        public string StudentName { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber1 { get; set; }
        public string PhoneNumber2 { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool isInActive { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public int CreateBy { get; set; }
        public int ModifiedBy { get; set; }
    }
}
