# DÉMARRAGE
1. &nbsp;&nbsp;*/EasyGardenCDA*
```
symfony new api
```
2. Supprimer le .git dans /EasyGardenCDA/api
3. &nbsp;&nbsp;*/EasyGardenCDA*
```
git init
```
4. &nbsp;&nbsp;*/EasyGardenCDA/api*
```
composer install
```
```
composer update
```
5. &nbsp;&nbsp;*/EasyGardenCDA/api*
```
composer req api
```
6. &nbsp;&nbsp;*/EasyGardenCDA/api*
```
composer require symfony/orm-pack
```
7. &nbsp;&nbsp;*/EasyGardenCDA/api*
```
composer require symfony/maker-bundle --dev
```
8. &nbsp;&nbsp;*/EasyGardenCDA/api*
```
composer require sensio/framework-extra-bundle
```
9. &nbsp;&nbsp;*/EasyGardenCDA/api*
```
composer require --dev symfony/profiler-pack
```
10. &nbsp;&nbsp;*/EasyGardenCDA/.env.local*
\
**Commenter** &nbsp;&nbsp; DATABASE_URL="postgresql://symfony:ChangeMe@127.0.0.1:5432/app?serverVersion=13&charset=utf8"
\
**Décommenter** &nbsp;&nbsp; DATABASE_URL="mysql://root:@127.0.0.1:3306/EasyGardenCDA?serverVersion=mariadb-10.5.8"
\
**Noter** &nbsp;&nbsp; APP_ENV=dev
11. */EasyGardenCDA/api/.env*
\
**Commenter** &nbsp;&nbsp; DATABASE_URL="postgresql://symfony:ChangeMe@127.0.0.1:5432/app?serverVersion=13&charset=utf8"
\
**Décommenter** &nbsp;&nbsp; DATABASE_URL="mysql://root:@127.0.0.1:3306/EasyGardenCDA?serverVersion=mariadb-10.5.8"
\
**Noter**APP_ENV=prod


# LANCER SERVEUR
1. Lancer serveur en local
```
symfony local:server:start --allow-http
```
```
php -S 127.0.0.1:8000 -t ./public
```

# ENTITY
1. Créer entity User
```
php bin/console make:user
```
2. Créer autres entity
```
php bin/console make:entity
```
3. Créer les relations entre entity

# NORMALIZATION/DENORMALIZATION CONTEXT
1. Créer les #Groups et exposer les propriétés
2. &nbsp;&nbsp; */EasyGardenCDA/api/config/packages/api_platform.yaml*
\
Configuration =>
```yaml
api_platform:
    title: 'EasyGarden API'
    description: 'API to deal with Vue.js'
    version: '1.0'
    show_webby: false
    mapping:
        paths: ['%kernel.project_dir%/src/Entity']
    patch_formats:
        json: ['application/merge-patch+json']
    swagger:
        versions: [3]
    eager_loading:
        force_eager: false
        fetch_partial: true
```

# MIGRATION
```
php bin/console doctrine:database:create
php bin/console doctrine:database:drop --force
```
```
php bin/console make:migration --no-interaction
```
```
php bin/console doctrine:migrations:migrate --no-interaction
```

# CONFIGURATION DOSSIER /config
1. &nbsp;&nbsp; */EasyGardenCDA/api/config/packages/prod/doctrine.yaml*
```yaml
when@prod:
    doctrine:
        orm:
            auto_generate_proxy_classes: false
            query_cache_driver:
                type: pool
                pool: doctrine.system_cache_pool
            result_cache_driver:
                type: pool
                pool: doctrine.result_cache_pool

    framework:
        cache:
            pools:
                doctrine.result_cache_pool:
                    adapter: cache.app
                doctrine.system_cache_pool:
                    adapter: cache.system
```
2. &nbsp;&nbsp; */EasyGardenCDA/api/config/packages/test/doctrine.yaml*
```yaml
when@test:
    doctrine:
        dbal:
            # "TEST_TOKEN" is typically set by ParaTest
            dbname_suffix: '_test%env(default::TEST_TOKEN)%'
```
3. Supprimer les blocs .yaml du dessus dans =>
\
*/EasyGardenCDA/api/config/packages/doctrine.yaml*

# FIXTURES
1. &nbsp;&nbsp;*/EasyGardenCDA/api*
```
composer require orm-fixtures --dev
```
2. &nbsp;&nbsp;*/EasyGardenCDA/api*
```
composer require fakerphp/faker
```
3. &nbsp;&nbsp;*/EasyGardenCDA/api*
```
composer require symfony/rate-limiter
```
4. Load fixture =>
```
php bin/console doctrine:fixtures:load --no-interaction
```

# AUTHENTIFICATION (JWT)
1. Créer dossier jwt
\
*/EasyGardenCDA/api/config*
2. &nbsp;&nbsp;*/EasyGardenCDA/api*
```
composer require lexik/jwt-authentication-bundle
```
3. Générer la clé privé et publique
```
openssl genrsa -out config/jwt/private.pem 4096
```
```
openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout
```
4. &nbsp;&nbsp;*/EasyGardenCDA/api/config/packages/lexik_jwt_authentication.yaml*
```yaml
lexik_jwt_authentication:
    secret_key: '%env(resolve:JWT_SECRET_KEY)%'
    public_key: '%env(resolve:JWT_PUBLIC_KEY)%'
    pass_phrase: '%env(JWT_PASSPHRASE)%'
    token_ttl: "%env(JWT_TTL)%"
    user_identity_field: email
```
5. &nbsp;&nbsp;*/EasyGardenCDA/api/config/routes.yaml*
```yaml
authentication_token:
    path: /authentication_token
    methods: ['GET','POST']
```
6. &nbsp;&nbsp;*/EasyGardenCDA/api/config/packages/security.yaml*
```yaml
firewalls:
        login:
            pattern: ^/authentication_token
            stateless: true
            provider: app_user_provider
            json_login:
                check_path: /authentication_token
                username_path: email
                success_handler: lexik_jwt_authentication.handler.authentication_success
                failure_handler: lexik_jwt_authentication.handler.authentication_failure        
        api:
            pattern:   ^/api
            stateless: true
            jwt: ~ 

access_control:
        - { path: ^/api/login, roles: IS_AUTHENTICATED_ANONYMOUSLY }
        - { path: ^/api/users, roles: PUBLIC_ACCESS,
            methods: [POST] }
        - { path: ^/api/users, roles: IS_AUTHENTICATED_FULLY,
            methods: [GET, PUT, DELETE] }
        - { path: ^/api/gardens, roles: IS_AUTHENTICATED_FULLY }
        - { path: ^/api/lawnmowers, roles: IS_AUTHENTICATED_FULLY }
        - { path: ^/api/lightnings, roles: IS_AUTHENTICATED_FULLY }
        - { path: ^/api/pools, roles: IS_AUTHENTICATED_FULLY }
        - { path: ^/api/portals, roles: IS_AUTHENTICATED_FULLY }
        - { path: ^/api/waterings, roles: IS_AUTHENTICATED_FULLY }

    role_hierarchy:
        ROLE_ADMIN: ROLE_USER
```

# USER DATA PROVIDERS
*/EasyGardenCDA/api/src/DataProvider/UserDataProvider.php*
```php
namespace App\DataProvider;

use App\Entity\User;
use App\Repository\UserRepository;
use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\DenormalizedIdentifiersAwareItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

final class UserDataProvider implements DenormalizedIdentifiersAwareItemDataProviderInterface, ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface
{
    private $userRepository;
    private $tokenStorage;
    
    public function __construct(UserRepository $userRepository, TokenStorageInterface $tokenStorage)
    {
        $this->userRepository = $userRepository;
        $this->tokenStorage = $tokenStorage;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return User::class === $resourceClass;
    }
    
    public function getCollection(string $resourceClass, string $operationName = null, array $context = []): iterable
    {
        $token = $this->tokenStorage->getToken();
        if (!$token) {
            if (array_key_exists('filters',$context)) {
                if (array_key_exists('email',$context['filters'])) {
                    if ($this->userRepository->findOneBy(['email'=>$context['filters']['email']])) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return null;
        }
        $user = $token->getUser();
        $roles = $user->getRoles();
            if ($user && in_array("ROLE_ADMIN", $roles)) {
                return $this->userRepository->findAll();
            }
            elseif ($user && in_array("ROLE_USER", $roles)) {
                return [$user];
            }
    }

    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = []): ?User
    {
        $token = $this->tokenStorage->getToken();
        if (!$token) {
            return null;
        }
        $user = $token->getUser();
        return $user;
    }
}
```
# USER DATA PERSISTER
*/EasyGardenCDA/api/src/DataPersister/UserDataPersister.php*
```php
namespace App\DataPersister;

use App\Entity\User;
use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;

class UserDataPersister implements DataPersisterInterface 
{
    private $entityManager;
    private $userPasswordEncoder;

    public function __construct (EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordEncoder)
    {
        $this->entityManager = $entityManager;
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof User;
    }

    /**
     * @param User $data
     */
    public function persist($data, array $context = [])
    {
        if ($data->getPlainPassword()) {
            $data->setPassword(
                $this->userPasswordEncoder->hashPassword($data, $data->getPlainPassword())
            );
            $data->eraseCredentials();
        }   
        $this->entityManager->persist($data);      
        $this->entityManager->flush();
    }

    public function remove($data, array $context = [])
    {
        $this->entityManager->remove($data);      
        $this->entityManager->flush();
    }
}
```
