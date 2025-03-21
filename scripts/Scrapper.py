from bs4 import BeautifulSoup
import pandas as pd
import requests
import re

session = requests.Session()

dorm_df = pd.DataFrame(columns=["name", "address", "num_rooms", "amenities", "price", "num_residents", "image", "Campus"])

housing_link = "https://ruoncampus.rutgers.edu/living-on-campus/"

busch_dorms = housing_link + "busch-campus/"

livi_dorms = housing_link + "livingston/"

ca_dorms = housing_link + "college-ave/"

cook_dorms = housing_link + "cookdouglass/"


busch_dorms_html = session.get(busch_dorms)

soup = BeautifulSoup(busch_dorms_html.text, "lxml")

dorm_table_list = soup.find("section", class_="col-md-9").find_all("div", class_="row")

for row in dorm_table_list:
    dorm_list = row.find_all("div", class_="col col-xs-6 col-sm-6 col-md-3 col-spacing-set")

    for dorm in dorm_list:
        dorm_name = dorm.strong.a.text

        number_of_residents = 2 if "Hall" in dorm_name else (6 if "Suite" in dorm_name else 4)

        img_sub_link = dorm.a.img["src"]

        img_link = "https://ruoncampus.rutgers.edu" + img_sub_link

        sub_link = dorm.strong.a["href"]

        dorm_link = "https://ruoncampus.rutgers.edu" + sub_link

        dorm_html = session.get(dorm_link)

        dorm_soup = BeautifulSoup(dorm_html.text, "lxml")

        dorm_html_table = dorm_soup.find_all("div", class_="view-content")[1]

        dorm_amenities_table =  dorm_html_table.find_all("ul")[1].find_all("li")

        dorm_amenities_list = []

        for amenity in dorm_amenities_table:
            dorm_amenities_list.append(amenity.text)

        amenities = ",".join(dorm_amenities_list)

        dorm_df.loc[len(dorm_df)] = [dorm_name, None, None, amenities, None, number_of_residents, img_link, "Busch"]



livi_dorms_html = session.get(livi_dorms)

soup = BeautifulSoup(livi_dorms_html.text, "lxml")

dorm_table_list = soup.find("section", class_="col-md-9").find_all("div", class_="row")

for row in dorm_table_list:
    dorm_list = row.find_all("div", class_="col col-xs-6 col-sm-6 col-md-3 col-spacing-set")

    for dorm in dorm_list:
        dorm_name = dorm.strong.a.text

        number_of_residents = 2 if "Hall" in dorm_name else (6 if "Suite" in dorm_name else 4)

        img_sub_link = dorm.a.img["src"]

        img_link = "https://ruoncampus.rutgers.edu" + img_sub_link

        sub_link = dorm.strong.a["href"]

        dorm_link = "https://ruoncampus.rutgers.edu" + sub_link

        dorm_html = session.get(dorm_link)

        dorm_soup = BeautifulSoup(dorm_html.text, "lxml")

        dorm_html_table = dorm_soup.find_all("div", class_="view-content")[1]

        dorm_amenities_table =  dorm_html_table.find_all("ul")[1].find_all("li")

        dorm_amenities_list = []

        for amenity in dorm_amenities_table:
            dorm_amenities_list.append(amenity.text)

        amenities = ",".join(dorm_amenities_list)

        dorm_df.loc[len(dorm_df)] = [dorm_name, None, None, amenities, None, number_of_residents, img_link, "Livingston"]


ca_dorms_html = session.get(ca_dorms)

soup = BeautifulSoup(ca_dorms_html.text, "lxml")

dorm_table_list = soup.find("section", class_="col-md-9").find_all("div", class_="row")

for row in dorm_table_list:
    dorm_list = row.find_all("div", class_="col col-xs-6 col-sm-6 col-md-3 col-spacing-set")

    for dorm in dorm_list:
        dorm_name = dorm.strong.a.text

        number_of_residents = 2 if "Hall" in dorm_name else (6 if "Suite" in dorm_name else 4)

        img_sub_link = dorm.a.img["src"]

        img_link = "https://ruoncampus.rutgers.edu" + img_sub_link

        sub_link = dorm.strong.a["href"]

        dorm_link = "https://ruoncampus.rutgers.edu" + sub_link

        dorm_html = session.get(dorm_link)

        dorm_soup = BeautifulSoup(dorm_html.text, "lxml")

        dorm_html_table = dorm_soup.find_all("div", class_="view-content")[1]

        dorm_amenities_table =  dorm_html_table.find_all("ul")[1].find_all("li")

        dorm_amenities_list = []

        for amenity in dorm_amenities_table:
            dorm_amenities_list.append(amenity.text)

        amenities = ",".join(dorm_amenities_list)

        dorm_df.loc[len(dorm_df)] = [dorm_name, None, None, amenities, None, number_of_residents, img_link, "College Avenue"]


cook_dorms_html = session.get(cook_dorms)

soup = BeautifulSoup(cook_dorms_html.text, "lxml")

dorm_table_list = soup.find("section", class_="col-md-9").find_all("div", class_="row")

for row in dorm_table_list:
    dorm_list = row.find_all("div", class_="col col-xs-6 col-sm-6 col-md-3 col-spacing-set")

    for dorm in dorm_list:
        dorm_name = dorm.strong.a.text

        number_of_residents = 2 if "Hall" in dorm_name else (6 if "Suite" in dorm_name else 4)

        img_sub_link = dorm.a.img["src"]

        img_link = "https://ruoncampus.rutgers.edu" + img_sub_link

        sub_link = dorm.strong.a["href"]

        dorm_link = "https://ruoncampus.rutgers.edu" + sub_link

        dorm_html = session.get(dorm_link)

        dorm_soup = BeautifulSoup(dorm_html.text, "lxml")

        dorm_html_table = dorm_soup.find_all("div", class_="view-content")[1]

        dorm_amenities_table =  dorm_html_table.find_all("ul")[1].find_all("li")

        dorm_amenities_list = []

        for amenity in dorm_amenities_table:
            dorm_amenities_list.append(amenity.text)

        amenities = ",".join(dorm_amenities_list)

        dorm_df.loc[len(dorm_df)] = [dorm_name, None, None, amenities, None, number_of_residents, img_link, "Cook/Douglass"]



dorm_df.to_csv("dorms.csv")
