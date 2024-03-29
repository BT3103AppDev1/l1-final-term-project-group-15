<template>
    <v-card
      class="mx-auto text-center"
      color="white"
      max-width="600"
      dark
    >
    <v-card-text class="title">
        <div class="text-p font-weight-thin">
            Kodak M35 35mm Film Camera - Price Trend
        </div>

        <v-spacer></v-spacer>

        <div class="text-center">
            <v-menu
            open-on-hover
            >
            <template v-slot:activator="{ props }">
                <v-btn
                color="black`"
                v-bind="props"
                >
                Timeline
                </v-btn>
            </template>

            <v-list>
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
            </v-menu>
        </div>
      </v-card-text>

    

      <v-card-text>
        <v-sheet color="rgba(0, 0, 0, .12)">
          <v-sparkline
            :model-value="value"
            color="black"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">
              ${{ item.value }}
            </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>
    </v-card>
  </template>

<script>
export default {
  data: () => ({
    value: [
      75,
      200,
      135,
      120,
      140,
      180,
      150,
    ],
    items: [
        { title: 'Day' },
        { title: 'Month'},
        { title: 'Year' },
      ],
  }),
}
</script>

<style scoped>
.title {
    display: flex;
}

.text-p {
    font-size: 1rem;
    font-family: 'poppins';
}

.v-card-text {
    padding: 0.6rem;
}
</style>