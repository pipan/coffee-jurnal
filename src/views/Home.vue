<template>
  <div>
    <h1>Coffee Jurnal</h1>
    <div class="jurnal">
        <div class="jurnal__day">
            <div class="jurnal__day-title">Today</div>
            <div class="jurnal__day-records">
                <div class="record">
                    <div class="record__label">E</div>
                    <div class="record__title">Soren</div>
                    <div class="record__subtitle">Kenya, NOMAD</div>
                    <div class="record__profile">
                        <div class="bar bar--y bar--intensity-1 bar--quality-1"></div>
                        <div class="bar bar--y bar--intensity-2 bar--quality-2"></div>
                        <div class="bar bar--y bar--intensity-3 bar--quality-3"></div>
                        <div class="bar bar--y bar--intensity-4 bar--quality-4"></div>
                        <div class="bar bar--y bar--intensity-5 bar--quality-5"></div>
                    </div>
                    <div class="record__rating">
                        <span class="record__rating-value">4</span>
                        <span class="record__rating-maximum">&nbsp;/&nbsp;5</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="jurnal__day">
            <div class="jurnal__day-title">Yesterday</div>
            <div class="jurnal__day-records">
                <div class="record">
                    <div class="record__label">E</div>
                    <div class="record__title">Soren</div>
                    <div class="record__subtitle">Kenya, NOMAD</div>
                    <div class="record__profile"></div>
                    <div class="record__rating">
                        <span class="record__rating-value">4</span>
                        <span class="record__rating-maximum">&nbsp;/&nbsp;5</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-link :to="{ name: 'Create' }" class="btn-fab">&plus;</router-link>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {}
}
</script>
