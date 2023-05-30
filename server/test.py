import requests
from bs4 import BeautifulSoup
from textblob import TextBlob
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/reviews', methods=['GET'])
def reviews():
    def scrape_reviews(asin):
        base_url = "https://www.amazon.com"
        review_page_url = f"{base_url}/product-reviews/{asin}"

        # Send a GET request to the review page
        response = requests.get(review_page_url)
        soup = BeautifulSoup(response.content, "html.parser")

        # Create a list to store the scraped data
        scraped_data = []

        while True:
            reviews = soup.select(".review")

            for review in reviews:
                # Extract review data
                review_title = review.select_one(".review-title").text.strip()
                rating = review.select_one(".review-rating span").text.strip()
                review_text = review.select_one(".review-text").text.strip()

                # Perform sentiment analysis using TextBlob
                blob = TextBlob(review_text)
                sentiment = blob.sentiment.polarity

                # Determine sentiment label and emoji based on sentiment score
                if sentiment > 0:
                    emoji = '😊'
                    sentiment_label = 'Positive'
                elif sentiment < 0:
                    emoji = '😞'
                    sentiment_label = 'Negative'
                else:
                    emoji = '😐'
                    sentiment_label = 'Neutral'

                # Create a dictionary for each review
                review_data = {
                    "review_title": review_title,
                    "rating": rating,
                    "review_text": review_text,
                    "emoji": emoji,
                    "polarity_score": sentiment,
                    "sentiment": sentiment_label
                }
                scraped_data.append(review_data)

            # Check if there is a next page
            next_button = soup.select_one(".a-last a")
            if next_button:
                next_page_url = base_url + next_button["href"]

                # Send a GET request to the next page
                response = requests.get(next_page_url)
                soup = BeautifulSoup(response.content, "html.parser")
            else:
                break

        return scraped_data

    asin = "B09G9FPHY6"
    reviews_data = scrape_reviews(asin)
    return jsonify(reviews_data)


if __name__ == '__main__':
    app.run()
