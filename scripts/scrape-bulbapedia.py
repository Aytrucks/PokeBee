import requests
from bs4 import BeautifulSoup

def main():
    def get_color(pokemon):
        print("Test")
        body = requests.get(f"https://bulbapedia.bulbagarden.net/wiki/{pokemon}_(Pok%C3%A9mon)").content
        soup = BeautifulSoup(body, 'html.parser')

        is_color = soup.select_one('a[title*=-colored]')
        title = is_color.get('title')
        color = title.replace("Category:", "").replace("-colored Pokémon","").strip()
        return color
    color = get_color("bulbasaur")
    print(color)
    

if __name__ == "__main__":
    main()