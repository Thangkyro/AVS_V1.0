using System;

namespace AVSProject.Models
{
    public class ClassModel
    {
        public int ClassID { get; set; }
        public string Descriptions { get; set; }
        public int BranchId { get; set; }
        public string ClassCode { get; set; }
        public string ClassName { get; set; }
        public bool isInActive { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime ModifiedAt { get; set; }
        public int CreateBy { get; set; }
        public int ModifiedBy { get; set; }
        public string Level { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
