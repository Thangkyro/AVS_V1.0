using AVSProject.EFModel;
using System.Collections.Generic;

namespace AVSProject.Interface
{
    public interface IClass
    {
        SClass Get(int userID);
        void Add(SClass Class);
        void Update(SClass Class);
        void Delete(int ClassID);
        List<SClass> GetAllClass();
    }
}
