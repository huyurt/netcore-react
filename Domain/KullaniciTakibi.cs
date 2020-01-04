namespace Domain
{
    public class KullaniciTakibi
    {
        public string GozlemciId { get; set; }
        public virtual AppUser Gozlemci { get; set; }
        public string HedefId { get; set; }
        public virtual AppUser Hedef { get; set; }
    }
}