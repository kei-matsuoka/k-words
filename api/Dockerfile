FROM ruby:3.1.2
RUN apt-get update -qq && \
    apt-get install -y build-essential \
    libpq-dev \
    nodejs

WORKDIR /api
COPY Gemfile /api/Gemfile
COPY Gemfile.lock /api/Gemfile.lock
RUN gem install bundler
RUN bundle install
ADD . /api
EXPOSE 3000

CMD ["/bin/sh", "-c", "bundle exec rails db:create && bundle exec rails db:migrate && bundle exec rails db:seed"]
