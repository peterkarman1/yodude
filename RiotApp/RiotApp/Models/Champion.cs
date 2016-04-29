namespace RiotApp.Models
{
    public class Champion
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Key { get; set; } // Name without spaces
    }
}