using ArgiGo.Database.Mapping;
using ArgiGo.Model.Entities;
using ArgiGo.Model.ModelData.Examples;
using Microsoft.EntityFrameworkCore;

namespace ArgiGo.Services
{
    public class ExampleServices
    {

        private ArgiGoContext _context;

        public ExampleServices(ArgiGoContext context)
        {
            _context = context;
        }

        public IEnumerable<Example> CreateExamples(IEnumerable<string> examplesData)
        {
            List<Example> examples = new List<Example>();

            foreach (var exampleData in examplesData)
            {
                var example = CreateExample(exampleData);

                examples.Add(example);
            }

            return examples;
        }

        public IEnumerable<Example> UpdateExamples(IEnumerable<Example> examples, IEnumerable<string> examplesData)
        {
            if (examples.Count() > 0) {
                _context.RemoveRange(examples);
            }

            List<Example> examplesList = new List<Example>();

            foreach (var exampleData in examplesData)
            {
                var example = CreateExample(exampleData);

                examplesList.Add(example);
            }

            _context.SaveChanges();

            return examplesList;
        }

        public Example CreateExample(string exampleData) 
        {
            var id = Guid.NewGuid().ToString();

            var example = new Example(id)
            {
                value = exampleData,
                Id = Guid.NewGuid().ToString(),
            };

            return example;
        }

        public IEnumerable<Example> ToExamples(IEnumerable<ExampleData> examplesData)
        {
            List<Example> examples = new List<Example>();

            foreach (var exampleData in examplesData)
            {
                var example = ToExample(exampleData);

                examples.Add(example);
            }

            return examples;
        }

        public Example ToExample(ExampleData exampleData)
        {
            var example = new Example(exampleData.Id)
            {
                value = exampleData.Example
            };

            return example;
        }

        public IEnumerable<ExampleData> toExampleData(IEnumerable<Example> examples)
        {
            List<ExampleData> exampleDataList = new List<ExampleData>();

            foreach (var example in examples)
            {
                var exampleData = new ExampleData()
                {
                    Example = example.value,
                    Id = example.Id,
                };

                exampleDataList.Add(exampleData);

            }

            return exampleDataList;
        }

        public IQueryable<Example> GetExamplesById(IEnumerable<string> ids) 
        {
            var examples = _context.Examples.Where(x => ids.Contains(x.Id));

            return examples;
        }

    }
}
