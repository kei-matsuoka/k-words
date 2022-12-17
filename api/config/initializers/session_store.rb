Rails.application.config.middleware.insert_before Rack::Head, ActionDispatch::Cookies
Rails.application.config.middleware.insert_after ActionDispatch::Cookies, ActionDispatch::Session::RedisStore,
  servers: [Rails.application.credentials.redis[:server]],
  expire_after: 60.minutes,
  key: "_session"
