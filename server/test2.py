from flask import Flask, request, jsonify
from flask_cors import CORS
from GoogleNews import GoogleNews
from newspaper import Article
from selenium import webdriver
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lex_rank import LexRankSummarizer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


app = Flask(__name__)
CORS(app)


@app.route('/newsSearch', methods=['POST'])
def news_results():
    search_term = request.json.get('searchTerm')
    # Fetch news URLs using GoogleNews library
    googlenews = GoogleNews(lang='en')
    googlenews.search(search_term)
    news_urls = googlenews.get_links()  # List of news URLs

    # Retrieve articles, title, images, etc. using newspaper3k library
    search_results = []
    for url in news_urls:
        article = Article(url)
        article.download()
        article.parse()
        article.nlp()

        # Extract relevant data from the article
        parser = PlaintextParser.from_string(
            article.text, Tokenizer("english"))
        summarizer = LexRankSummarizer()
        # Specify the number of sentences in the summary
        summary = summarizer(parser.document, sentences_count=3)

        # Perform sentiment analysis on the summary
        sentiment_analyzer = SentimentIntensityAnalyzer()
        summary_sentiment = sentiment_analyzer.polarity_scores(
            ' '.join(str(sentence) for sentence in summary))

        search_result = {
            'title': article.title,
            'url': url,
            'text': article.text,
            'summary': ' '.join(str(sentence) for sentence in summary),
            'sentiment': summary_sentiment['compound'],
            # Add more fields as needed
        }

        search_results.append(search_result)

    response = jsonify(search_results)
    response.headers.add('Access-Control-Allow-Origin',
                         'http://localhost:3000')
    return response


@app.route('/reviews', methods=['GET'])
def reviews():
    from selenium.webdriver.common.by import By
    from selenium.webdriver.chrome.service import Service
    from selenium.webdriver.chrome.options import Options
    from selenium.common.exceptions import NoSuchElementException
    from textblob import TextBlob

    def scrape_reviews(asin):
        # Set up Chrome options
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Enable headless mode

        # Set up the Selenium WebDriver with Chrome and Chrome options
        # Replace with the actual path to chromedriver ON LOCAL STORAGE
        chrome_driver_path = "/Users/jp/Desktop/chromedriver_mac64"
        selenium_service = Service(chrome_driver_path)
        driver = webdriver.Chrome(
            service=selenium_service, options=chrome_options)

        # Website link and ASIN value
        base_url = "https://www.amazon.com"
        review_page_url = f"{base_url}/product-reviews/{asin}"

        # Open the review page in the browser
        driver.get(review_page_url)

        # Wait for the page to load
        driver.implicitly_wait(5)

        # Create a list to store the scraped data
        scraped_data = []

        while True:
            reviews = driver.find_elements(By.CSS_SELECTOR, ".review")

            for review in reviews:
                review_title = review.find_element(
                    By.CSS_SELECTOR, ".review-title").text
                rating = review.find_element(
                    By.CSS_SELECTOR, ".review-rating span").get_attribute("innerHTML")
                review_text = review.find_element(
                    By.CSS_SELECTOR, ".review-text").text

                # Perform sentiment analysis using TextBlob
                blob = TextBlob(review_text)
                sentiment = blob.sentiment.polarity

                if sentiment > 0:
                    emoji = '😊'
                    sentiment_label = 'Positive'
                elif sentiment < 0:
                    emoji = '😞'
                    sentiment_label = 'Negative'
                else:
                    emoji = '😐'
                    sentiment_label = 'Neutral'

                # Perform summarization using Sumy's LexRankSummarizer
                parser = PlaintextParser.from_string(
                    review_text, Tokenizer("english"))
                summarizer = LexRankSummarizer()
                # Specify the number of sentences in the summary
                summary = summarizer(parser.document, sentences_count=2)

                # Convert summary sentences to a string
                summary_text = " ".join(str(sentence) for sentence in summary)

                # Create a dictionary for each review including the summary
                review_data = {
                    "review_title": review_title,
                    "rating": rating,
                    "review_text": review_text,
                    "summary": summary_text,
                    "emoji": emoji,
                    "polarity_score": sentiment,
                    "sentiment": sentiment_label
                }
                scraped_data.append(review_data)

            try:
                # Check if there is a next page
                next_button = driver.find_element(By.CSS_SELECTOR, ".a-last a")
                next_page_url = next_button.get_attribute("href")
                driver.get(next_page_url)
            except NoSuchElementException:
                # If there is no next page, break the loop
                break

        # Close the browser
        driver.quit()

        return scraped_data

    # Example usage
    asin = "B09G9FPHY6"
    reviews = scrape_reviews(asin)
    return jsonify(reviews)


if __name__ == '__main__':
    app.run(debug=True)
