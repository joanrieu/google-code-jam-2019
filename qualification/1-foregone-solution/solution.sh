read cases

trap "rm input" EXIT
cat >input

paste -d "" \
  <(yes "Case #" | head -$cases) \
  <(seq 1 $cases) \
  <(yes ": " | head -$cases) \
  <(cat input | sed 's/4/3/g') \
  <(yes " " | head -$cases) \
  <(cat input | sed 's/[^4]/0/g' | sed 's/4/1/g' | sed 's/^0*//g')
