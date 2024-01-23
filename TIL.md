1. 사용자가 로그인
2. 성공시 토큰 발급, 로컬스토리지에 토큰 저장
3. 


생각했던 방법 
getters 로 isAdmin 을 읽어준다.

```
router.beforeEach((to, from, next) => {
  // requiresAdmin 메타 필드가 true이면 어드민 권한을 확인하여 접근 허용
  if (to.meta.requiresAdmin) {
    const isAdmin = store.getters['auth/isAdmin'];
    if (isAdmin) {
      next();
    } else {
      // 어드민이 아닌 경우 다른 페이지로 리다이렉트 또는 접근 거부 처리
      next('/'); // 또는 next(false) 등으로 처리
    }
  } else {
    next();
  }
});
```

서버에서 직접 사용자의 어드민 여부를 확인하는 것이 클라이언트에서 상태를 읽는 것보다 더 신뢰할 수 있다. 

클라이언트에서 상태를 읽는 것은 사용자에게서 어떠한 조작이 가해지지 않았다고 가정하는 것이기 때문이다.

접근 권한이 필요한 페이지는 클라이언트를 신뢰하지 말고 서버로부터 어드민 여부를 확인하고 그 결과에 따라 라우터 내비게이션을 결정한다.



Vuex 모듈

Vuex 모듈 내에서는 mutations, actions 등을 호출할 때 모듈 이름을 사용하지 않아도 됩니다. 모듈 내부에서는 동일한 모듈에 속한 mutations나 actions에 대한 호출 시에는 모듈 이름을 생략하고 직접 호출할 수 있습니다.


### 2024.01.14


