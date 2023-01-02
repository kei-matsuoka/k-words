FROM ruby:3.1.2
RUN apt-get update -qq && \
    apt-get install -y build-essential \
    libpq-dev \
    nodejs

WORKDIR /api
COPY Gemfile /api/Gemfile
COPY Gemfile.lock /api/Gemfile.lock
RUN gem install bundler
RUN bundle install --without test development
ADD . /api
EXPOSE 3000

CMD ["/bin/sh", "-c", "bundle exec puma -p 3000 -e production"]
# bundle exec rails db:create && bundle exec rails db:migrate && bundle exec rails db:seed && 
# RAILS_ENV=production DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rails db:migrate:reset && bundle exec rails db:seed && 
