Rails.application.config.middleware.insert_before Rack::Head, ActionDispatch::Cookies
Rails.application.config.middleware.insert_after ActionDispatch::Cookies, ActionDispatch::Session::RedisStore,
  servers: ["redis://k-words-elc.wwmp8y.ng.0001.apne1.cache.amazonaws.com:6379"],
  expire_after: 5.minutes,
  key: "_session"

  # servers: ["redis://#{ENV.fetch("REDIS_HOST") { "localhost" }}:6379/0"],
  # servers: ["redis://redis:6379"],
