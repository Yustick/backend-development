import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { ChatsModule } from './chats/chats.module';
import { RolesModule } from './roles/roles.module';
import { LoggerMiddleware } from '@app/middlewares';

@Module({
    imports: [
        UsersModule, 
        MessagesModule, 
        ChatsModule,
        RolesModule
    ],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	//   consumer.apply(RateLimitMiddleware).forRoutes('*');
	  consumer.apply(LoggerMiddleware).forRoutes('*');
	//   consumer.apply(AuthMiddleware)
	// 	.exclude({ path: '/api/v1/users', method: RequestMethod.GET }) // <-- виключення
	// 	.forRoutes('/api/v1/users*');
	}
}
