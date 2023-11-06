using AVSProject.EFModel;
using AVSProject.Interface;
using System.Collections.Generic;
using System.Linq;

namespace AVSProject.DataService
{
    public class ClassService : IClass
    {
        private static db_AVSContext dbcontext = new db_AVSContext();

        public void Delete(int ClassID)
        {
            var user = dbcontext.SClasses.First(x => x.ClassId == ClassID);
            dbcontext.Remove(user);
            dbcontext.SaveChanges();
        }

        public SClass Get(int ClassID)
        {
            return dbcontext.SClasses.First(x => x.ClassId == ClassID);
        }

        public List<SClass> GetAllClass()
        {
            return dbcontext.SClasses.ToList();
        }

        public void Update(SClass Class)
        {
            var model = dbcontext.Update<SClass>(Class);
            dbcontext.SaveChanges(true);
        }

        public void Add(SClass Class)
        {
            var model = dbcontext.Add<SClass>(Class);
            dbcontext.SaveChanges(true);
        }
    }
}
