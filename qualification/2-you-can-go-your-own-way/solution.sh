read cases
paste -d "" \
  <(yes "Case #" | head -$cases) \
  <(seq 1 $cases) \
  <(yes ": " | head -$cases) \
  <(sed -nr -e 's/S/#/g' -e 's/E/S/g' -e 's/#/E/gp')
