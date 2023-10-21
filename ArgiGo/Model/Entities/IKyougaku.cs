namespace ArgiGo.Model.Entities
{
    public interface IKyougaku
    {
        public string Present { get; set; }

        public string Past { get; set; }

        public string Negative { get; set; }

        public string NegativePast { get; set; }
    }
}
