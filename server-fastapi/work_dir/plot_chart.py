# filename: plot_chart.py

import requests
import feedparser
import matplotlib.pyplot as plt
from typing import List, Dict

def search_arxiv(query: str, max_results: int = 100) -> List[Dict[str, str]]:
    base_url = "http://export.arxiv.org/api/query?"
    search_query = f"search_query=all:{query}"
    start = 0
    max_results = f"max_results={max_results}"
    url = f"{base_url}{search_query}&start={start}&{max_results}"
    response = requests.get(url)
    feed = feedparser.parse(response.content)

    papers = [{"title": entry.title, "link": entry.link, "summary": entry.summary} for entry in feed.entries]
    return papers

def generate_bar_chart(domains: Dict[str, int], output_file: str) -> None:
    fig, ax = plt.subplots()
    ax.bar(domains.keys(), domains.values())
    plt.xticks(rotation=45, ha="right")
    plt.xlabel("Application Domains")
    plt.ylabel("Number of Papers")
    plt.title("Number of Papers per Application Domain")

    plt.tight_layout()
    plt.savefig(output_file)
    plt.show()


# Use the search_arxiv function to collect relevant papers from arxiv using a search query
papers = search_arxiv("GPT models")

# Simulated process of analyzing the abstracts of the collected papers to identify application domains
# Replace this with actual analysis of the papers' abstracts
domains = {
    'NLP': 25,
    'Computer Vision': 20,
    'Biotechnology': 15,
    'Data Science': 33,
    'Mobile Applications': 7
}

# Use the generate_bar_chart function to generate a bar chart of the application domains and 
# the number of papers in each domain, and save it as an image file
generate_bar_chart(domains, "application_domains.png")