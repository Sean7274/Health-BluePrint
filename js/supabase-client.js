/* Health Blueprint — Supabase connection
   This key is a "publishable" key: it is meant to be public and is safe to
   ship in client-side code. Row Level Security policies on the database
   (see supabase/schema.sql) control what it's actually allowed to read or
   write — never put the secret/service_role key here. */
(function (window) {
  "use strict";
  var SUPABASE_URL = "https://kcohwhwplsocpqalykmd.supabase.co";
  var SUPABASE_PUBLISHABLE_KEY = "sb_publishable_fvTT2lTm2vDz54sghYh6tA_ikJ-MaUm";

  if (!window.supabase) {
    console.error("Supabase client library failed to load; auth and booking features will not work.");
    return;
  }
  window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
})(window);
