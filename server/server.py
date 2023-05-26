from flask import Flask, request, jsonify
from flask_cors import CORS
from GoogleNews import GoogleNews
from newspaper import Article
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


if __name__ == '__main__':
    app.run(debug=True)
