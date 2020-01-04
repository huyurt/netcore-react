namespace Application.Etkinlikler
{
    public class KatilimciDto
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public bool YayinlandiMi { get; set; }
        public bool TakipEdiliyor { get; set; }
    }
}