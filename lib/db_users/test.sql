select distinct t.tweet as tweet, t.imageLoc as image_loc, t.uname as uname, t.first_name as name
from Tweets t, Follows f
where t.email='bstaplet@student.umass.edu' or (f.follower='bstaplet@student.umass.edu' and t.email=f.followee)
order by t.ttime
limit 20;